import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
}

const Calculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
  });

  const inputNumber = (num: string) => {
    const { display, waitingForOperand } = state;

    if (waitingForOperand) {
      setState({
        ...state,
        display: num,
        waitingForOperand: false,
      });
    } else {
      setState({
        ...state,
        display: display === '0' ? num : display + num,
      });
    }
  };

  const inputDot = () => {
    const { display, waitingForOperand } = state;

    if (waitingForOperand) {
      setState({
        ...state,
        display: '0.',
        waitingForOperand: false,
      });
    } else if (display.indexOf('.') === -1) {
      setState({
        ...state,
        display: display + '.',
      });
    }
  };

  const clear = () => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForOperand: false,
    });
  };

  const performOperation = (nextOperation: string) => {
    const { display, previousValue, operation } = state;
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setState({
        ...state,
        previousValue: inputValue,
        operation: nextOperation,
        waitingForOperand: true,
      });
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setState({
        ...state,
        display: String(newValue),
        previousValue: newValue,
        operation: nextOperation,
        waitingForOperand: true,
      });
    }
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : firstValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const { display, previousValue, operation } = state;
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setState({
        display: String(newValue),
        previousValue: null,
        operation: null,
        waitingForOperand: true,
      });
    }
  };

  const buttons = [
    { label: 'C', action: clear, variant: 'clear' as const, span: 2 },
    { label: '⌫', action: () => {
      const newDisplay = state.display.slice(0, -1) || '0';
      setState({ ...state, display: newDisplay });
    }, variant: 'clear' as const },
    { label: '÷', action: () => performOperation('÷'), variant: 'operator' as const },

    { label: '7', action: () => inputNumber('7'), variant: 'number' as const },
    { label: '8', action: () => inputNumber('8'), variant: 'number' as const },
    { label: '9', action: () => inputNumber('9'), variant: 'number' as const },
    { label: '×', action: () => performOperation('×'), variant: 'operator' as const },

    { label: '4', action: () => inputNumber('4'), variant: 'number' as const },
    { label: '5', action: () => inputNumber('5'), variant: 'number' as const },
    { label: '6', action: () => inputNumber('6'), variant: 'number' as const },
    { label: '-', action: () => performOperation('-'), variant: 'operator' as const },

    { label: '1', action: () => inputNumber('1'), variant: 'number' as const },
    { label: '2', action: () => inputNumber('2'), variant: 'number' as const },
    { label: '3', action: () => inputNumber('3'), variant: 'number' as const },
    { label: '+', action: () => performOperation('+'), variant: 'operator' as const },

    { label: '0', action: () => inputNumber('0'), variant: 'number' as const, span: 2 },
    { label: '.', action: inputDot, variant: 'number' as const },
    { label: '=', action: handleEquals, variant: 'equals' as const },
  ];

  return (
    <div className="mx-auto max-w-sm">
      <div className="bg-card rounded-3xl p-6 shadow-2xl border border-border backdrop-blur-sm">
        {/* Display */}
        <div className="bg-calc-display rounded-2xl p-6 mb-6 min-h-[80px] flex items-end justify-end shadow-inner">
          <div className="text-right">
            <div className="text-3xl font-light text-foreground font-mono tracking-wider">
              {state.display}
            </div>
            {state.operation && state.previousValue !== null && (
              <div className="text-sm text-muted-foreground mt-1 font-mono">
                {state.previousValue} {state.operation}
              </div>
            )}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <Button
              key={index}
              onClick={button.action}
              className={cn(
                "h-16 text-lg font-semibold rounded-xl transition-all duration-200 active:scale-95",
                button.span === 2 && "col-span-2",
                {
                  'bg-calc-number hover:bg-calc-number/80 text-foreground border border-border/50': 
                    button.variant === 'number',
                  'bg-calc-operator hover:bg-calc-operator/80 text-primary-foreground shadow-lg shadow-calc-operator/25': 
                    button.variant === 'operator',
                  'bg-calc-equals hover:bg-calc-equals/80 text-accent-foreground shadow-lg shadow-calc-equals/25': 
                    button.variant === 'equals',
                  'bg-calc-clear hover:bg-calc-clear/80 text-destructive-foreground shadow-lg shadow-calc-clear/25': 
                    button.variant === 'clear',
                }
              )}
              variant="ghost"
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;