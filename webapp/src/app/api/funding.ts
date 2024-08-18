"use client";

import { ChainAddress } from '@/app/types/chainAddress';
import { FundingResData, FundingFlowRecord } from '@/app/types/fundingRecord';


export const getFundingGraph = async (): Promise<FundingResData> => {
    const mapEdgeToFlowRecord = (edge): FundingFlowRecord => {
        return {
            source: {
                address: edge.source.address,
                chainId: edge.source.chain_id,
                type: edge.source.type,
                name: edge.source.name,
            },
            dest: {
                address: edge.dest.address,
                chainId: edge.dest.chain_id,
                type: edge.dest.type,
                name: edge.dest.name,
            }
        };
    }

    const BASE_URL = 'http://0.0.0.0:8000/api/v1'  // todo: take it from config
    const response = await fetch(`${BASE_URL}/funding/graph`);
    const data = await response.json();
    return { edges: data.edges.map(mapEdgeToFlowRecord) };
};
