'use client';
import FlowChart from '@/app/components/charts/FlowChart';
import { Spinner } from '@/app/components/spinner/Spinner';
import { useFundsFlow } from '@/app/dashboard/hooks/useFundsFlow';


export default function Dashboard() {
    const { isLoading, error, nodes, edges } = useFundsFlow();

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <span>Error: {error}</span>;
    }

    return ( <FlowChart nodes={nodes} edges={edges} />);
}
