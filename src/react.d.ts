import React from 'react';

export type PropsWithChildren = { children?: React.ReactNode };

export type ReactFCWithChildren<T> = React.FC<PropsWithChildren & T>;
