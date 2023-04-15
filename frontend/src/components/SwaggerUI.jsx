import React, { useEffect, useRef } from 'react';
import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

const SwaggerUIWrapper = ({ url }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    SwaggerUI({ url, domNode: containerRef.current });
  }, [url]);

  return <div ref={containerRef} />;
};

export default SwaggerUIWrapper;
