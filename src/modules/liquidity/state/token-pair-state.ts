import { Token } from '@/modules/api/entities';
import { useCallback, useState } from 'react';

export function useTokenPairState(tokens: Token[]): [Token, Token, (token: Token) => void, (token: Token) => void] {
  const [tokenA, setTokenA] = useState<Token>(tokens[0]);
  const [tokenB, setTokenB] = useState<Token>(tokens[1]);

  const setUniqueTokenA = useCallback((token: Token) => {
    if (token.address === tokenB.address) {
      setTokenB(tokenA);
    }

    setTokenA(token);
  }, [tokenA, tokenB]);

  const setUniqueTokenB = useCallback((token: Token) => {
    if (token.address === tokenA.address) {
      setTokenA(tokenB);
    }

    setTokenB(token);
  }, [tokenA, tokenB]);

  return [tokenA, tokenB, setUniqueTokenA, setUniqueTokenB];
}
