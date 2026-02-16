import { useState, useEffect } from 'react';

const TOAST_LIMIT = 1;

let count = 0;
function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const toastStore = {
  state: {
    toasts: [],
  },
  listeners: [],

  getState: () => toastStore.state,

  setState: (nextState) => {
    if (typeof nextState === 'function') {
      toastStore.state = nextState(toastStore.state);
    } else {
      toastStore.state = nextState;
    }

    toastStore.listeners.forEach((listener) => {
      listener(toastStore.state);
    });
  },

  subscribe: (listener) => {
    toastStore.listeners.push(listener);
    return () => {
      const index = toastStore.listeners.indexOf(listener);
      if (index > -1) {
        toastStore.listeners.splice(index, 1);
      }
    };
  },

  addToast: (toast) => {
    toastStore.setState((state) => ({
      toasts: [toast, ...state.toasts].slice(0, TOAST_LIMIT),
    }));
  },

  updateToast: (id, toast) => {
    toastStore.setState((state) => ({
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, ...toast } : t)),
    }));
  },

  dismissToast: (id) => {
    toastStore.setState((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, open: false } : t
      ),
    }));

    setTimeout(() => {
      toastStore.setState((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 200);
  },

  removeToast: (id) => {
    toastStore.setState((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
};

function toast({ ...props }) {
  const id = generateId();

  const dismiss = () => toastStore.dismissToast(id);
  const update = (props) => toastStore.updateToast(id, props);

  toastStore.addToast({
    ...props,
    id,
    open: true,
    onOpenChange: (open) => {
      if (!open) dismiss();
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = useState(toastStore.getState());

  useEffect(() => {
    return toastStore.subscribe(setState);
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId) => toastStore.dismissToast(toastId),
  };
}

export { useToast, toast };
