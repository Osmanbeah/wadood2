type Listener = () => void;

let currentEffect: Listener | null = null;

/**
 * Creates a reactive signal.
 * When `value` is accessed inside an `effect`, the effect is subscribed to changes.
 */
export function state<T>(initialValue: T) {
  let value = initialValue;
  const subscribers = new Set<Listener>();

  return {
    get value() {
      if (currentEffect) {
        subscribers.add(currentEffect);
      }
      return value;
    },
    set value(newValue: T) {
      if (value !== newValue) {
        value = newValue;
        // Trigger all subscribers
        const toNotify = Array.from(subscribers);
        toNotify.forEach((fn) => fn());
      }
    },
  };
}

/**
 * Runs a function and automatically re-runs it when any accessed `state.value` changes.
 */
export function effect(fn: Listener) {
  function wrappedEffect() {
    const prevEffect = currentEffect;
    currentEffect = wrappedEffect;
    try {
      fn();
    } finally {
      currentEffect = prevEffect;
    }
  }
  wrappedEffect();
}

/**
 * Runs a function without establishing any reactive subscriptions.
 */
export function untrack<T>(fn: () => T): T {
  const prevEffect = currentEffect;
  currentEffect = null;
  try {
    return fn();
  } finally {
    currentEffect = prevEffect;
  }
}

/**
 * Component wrapper - returns a function that creates a DOM element.
 */
export function component<T extends Element>(factory: () => T): () => T {
  return factory;
}

/**
 * Helper to create DOM elements with reactive attributes/content.
 */
export function h(
  tag: string,
  props: Record<string, any> = {},
  ...children: (Node | string | (() => Node | string))[]
): Element {
  const isSVG = ['svg', 'line', 'path', 'circle', 'text', 'rect', 'polyline', 'g', 'marker'].includes(tag);
  const el = isSVG
    ? document.createElementNS('http://www.w3.org/2000/svg', tag) as SVGElement
    : document.createElement(tag);

  for (const [key, val] of Object.entries(props)) {
    if (key.startsWith('on') && typeof val === 'function') {
      const eventName = key.toLowerCase().substring(2);
      el.addEventListener(eventName, val);
    } else if (typeof val === 'function' && key !== 'render') {
      // Reactive attribute
      effect(() => {
        const result = val();
        if (key === 'className' || key === 'class') {
          if (isSVG) el.setAttribute('class', result);
          else (el as HTMLElement).className = result;
        } else if (key === 'style' && typeof result === 'object') {
          Object.assign((el as HTMLElement | SVGElement).style, result);
        } else {
          if (isSVG) el.setAttribute(key, result);
          else (el as any)[key] = result;
        }
      });
    } else {
      // Static attribute
      if (key === 'className' || key === 'class') {
        if (isSVG) el.setAttribute('class', val);
        else (el as HTMLElement).className = val;
      } else if (key === 'style' && typeof val === 'object') {
        Object.assign((el as HTMLElement | SVGElement).style, val);
      } else {
        if (isSVG) el.setAttribute(key, val);
        else (el as any)[key] = val;
      }
    }
  }

  children.forEach((child) => {
    if (typeof child === 'function') {
      const textNode = document.createTextNode('');
      let currentChild: Node = textNode;
      el.appendChild(currentChild);

      effect(() => {
        const nextResult = child();
        
        if (nextResult instanceof Node) {
          if (nextResult !== currentChild) {
            el.replaceChild(nextResult, currentChild);
            currentChild = nextResult;
          }
        } else {
          const nextText = String(nextResult);
          if (currentChild.nodeType === Node.TEXT_NODE) {
            if (currentChild.nodeValue !== nextText) {
              currentChild.nodeValue = nextText;
            }
          } else {
            const nextChild = document.createTextNode(nextText);
            el.replaceChild(nextChild, currentChild);
            currentChild = nextChild;
          }
        }
      });
    } else if (child instanceof Node) {
      el.appendChild(child);
    } else {
      el.appendChild(document.createTextNode(String(child)));
    }
  });

  return el;
}
