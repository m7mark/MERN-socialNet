import { Suspense } from 'react';

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
        return (props: WCP) => {
                return <Suspense fallback={null}>
                        <WrappedComponent {...props} />
                </Suspense>
        }
};