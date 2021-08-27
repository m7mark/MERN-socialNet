import { Suspense } from 'react';
import { AntPreloader } from '../components/UI/AntPreloader';

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
        return (props: WCP) => {
                return <Suspense fallback={null}>
                        <WrappedComponent {...props} />
                </Suspense>
        }
};