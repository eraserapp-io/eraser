import React from 'react';

export type WalkthroughProps = {};
export type Slide = {
  title: string;
  description: string;
  image: (width: number, height: number) => React.ReactNode;
};
