import { NodeProps, Handle, Position } from 'reactflow';
import { FC } from 'react';
import { ChainAddress } from '@/app/types/ChainAddress';

interface AddressNodeData extends ChainAddress {
    readonly isSource?: boolean;
}

export const FundNode: FC<NodeProps<AddressNodeData>> = node => {
    const { data } = node;
    return (
        <>
            <Handle type="source" position={Position.Right} />
            <div className='fund-node'>
                <div><b>{data.name}</b></div>
                <div>{data.address}</div>
            </div>
            <Handle type="target" position={Position.Left} />
        </>
    );
};
