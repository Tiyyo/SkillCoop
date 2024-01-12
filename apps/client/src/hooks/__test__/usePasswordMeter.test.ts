import { describe, it, expect } from 'vitest';
import usePasswordMeter from '../usePasswordMeter';
import { renderHook } from '@testing-library/react';

describe('usePasswordMeter', () => {
  it('should return currentPassword and trackPasswordChangeValue', () => {
    const { result } = renderHook(() => usePasswordMeter());
    expect(result.current).toHaveProperty('currentPassword');
    expect(result.current).toHaveProperty('trackPasswordChangeValue');
    console.log(result.current);
  });
});
