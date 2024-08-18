import { useQuery } from '@tanstack/react-query'
import { Edge, MarkerType } from 'reactflow';

import { NODE_TYPES } from '@/app/components/charts/FlowChart.constants';
import { getFundingGraph } from '@/app/api/funding';
import { getGroupLayout } from '@/app/utils/getGroupLayout';


type FundsFlowData = {
    readonly isLoading?: boolean;
    readonly error?: string;
    readonly nodes: Node[];
    readonly edges: Edge[];
}

const convert2FundsFlowData = (data: FundingResData): FundsFlowData => {
    const nodesDict: Record<string, Node> = data.edges.reduce((acc, edge) => {
        acc[edge.source.address] = {
            id: edge.source.address,
            data: edge.source,
            type: NODE_TYPES.FUND_NODE,
        };
        acc[edge.dest.address] = {
            id: edge.dest.address,
            data: edge.dest,
            type: NODE_TYPES.FUND_NODE,
        };
        return acc;
    }, {});

    const edges: Edge[] = data.edges.map(edge => {
        return {
            id: `${edge.source.address}-${edge.dest.address}`,
            source: edge.source.address,
            target: edge.dest.address,
            markerEnd: {
                type: MarkerType.Arrow,
            }
        };
    });
    return {
        nodes: Object.values(nodesDict),
        edges,
    };
}

export const useFundsFlow = (): FundsFlowData => {
    const { status, data, error, isFetching } = useQuery({
        queryKey: ['funding/graph'],
        queryFn: getFundingGraph
    });

    if (data === undefined) {
        return {
            isLoading: isFetching,
            error: error?.message,
            nodes: [],
            edges: [],
        };
    }

    const {nodes, edges} = convert2FundsFlowData(data);
    const groupLayout = getGroupLayout(nodes, edges, 'LR');
    return {
        nodes: groupLayout.nodes,
        edges: groupLayout.edges,
        isLoading: isFetching
    };
};
