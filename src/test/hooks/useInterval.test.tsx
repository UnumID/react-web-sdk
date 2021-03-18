import { renderHook, act } from '@testing-library/react-hooks';

import { useInterval } from '../../hooks/useInterval';

describe('useInterval', () => {
  it('calls the callback at the interval', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    const interval = 1000;

    const { result } = renderHook(() => useInterval(callback, interval));

    act(() => {
      result.current[0]();
    });

    jest.advanceTimersByTime(1000);
    expect(callback).toBeCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toBeCalledTimes(2);
  });
});
