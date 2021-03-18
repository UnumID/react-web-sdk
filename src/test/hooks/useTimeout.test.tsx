import { renderHook, act } from '@testing-library/react-hooks';

import { useTimeout } from '../../hooks/useTimeout';

describe('useTimeout', () => {
  it('calls the callback after the delay', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    const delay = 1000;

    const { result } = renderHook(() => useTimeout(callback));

    act(() => {
      result.current[0](delay);
    });

    jest.advanceTimersByTime(delay);
    expect(callback).toBeCalledTimes(1);
  });
});
