import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from 'react';

type ScriptState = {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
};

type ScriptAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS' }
  | { type: 'LOAD_ERROR'; payload: string };

type RazorpayScriptContextType = ScriptState & {
  loadScript: () => void;
};

const initialState: ScriptState = {
  isLoaded: false,
  isLoading: false,
  error: null,
};

const RazorpayScriptContext = createContext<RazorpayScriptContextType | undefined>(undefined);

function razorpayScriptReducer(state: ScriptState, action: ScriptAction): ScriptState {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, isLoading: true, error: null };
    case 'LOAD_SUCCESS':
      return { ...state, isLoading: false, isLoaded: true };
    case 'LOAD_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

export const RazorpayScriptProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(razorpayScriptReducer, initialState);

  const loadScript = useCallback(() => {
    if (state.isLoaded || state.isLoading) return;

    dispatch({ type: 'LOAD_START' });

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => dispatch({ type: 'LOAD_SUCCESS' });
    script.onerror = () =>
      dispatch({ type: 'LOAD_ERROR', payload: 'Failed to load Razorpay script' });

    document.body.appendChild(script);
  }, [state.isLoaded, state.isLoading]);

  return (
    <RazorpayScriptContext.Provider value={{ ...state, loadScript }}>
      {children}
    </RazorpayScriptContext.Provider>
  );
};

export const useRazorpayScriptReducer = (): RazorpayScriptContextType => {
  const context = useContext(RazorpayScriptContext);
  if (!context) {
    throw new Error('useRazorpayScriptReducer must be used within RazorpayScriptProvider');
  }
  return context;
};
