import { Test, TestingModule } from '@nestjs/testing';
import { RandomService } from './service';
import { InjectedOneService } from './injected-one.service';
import { InjectedTwoService } from './intjected-two.service';
import { describe, it, expect, vi } from 'vitest';

describe('Service', () => {
  it('should work without testing module', () => {
    const injectedOneMockService = new InjectedOneService();
    const injectedTwoMockService = new InjectedTwoService();
    const result = new RandomService(
      injectedOneMockService,
      injectedTwoMockService,
    );
    injectedOneMockService.foo = vi.fn().mockImplementation(() => 'mock foo');
    expect(result).toBeDefined();
    expect(result.getStr()).toBe('mock foo bar');
  });
  it.skip('should work with testing module', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomService, InjectedOneService, InjectedTwoService],
    }).compile();

    const injectedOneMockService =
      module.get<InjectedOneService>(InjectedOneService);

    const injectedTwoMockService =
      module.get<InjectedTwoService>(InjectedTwoService);

    const result = module.get<RandomService>(RandomService);

    injectedOneMockService.foo = vi.fn().mockImplementation(() => 'mock foo');
    injectedTwoMockService.bar = vi.fn().mockImplementation(() => 'mock bar');

    expect(result).toBeDefined();
    expect(result.getStr()).toBe('mock foo mock bar');
  });
});
