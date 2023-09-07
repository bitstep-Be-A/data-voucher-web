import { useEffect, useState } from 'react';
import _ from 'lodash';

export default function useElementWidth(elementRef: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = _.throttle(() => {
      if (elementRef.current) {
        setWidth(elementRef.current.offsetWidth);
      }
    }, 200);

    // 컴포넌트가 마운트될 때 초기 너비 설정
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [elementRef]);

  return width;
}
