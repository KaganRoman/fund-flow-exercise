import json
from typing import List

from fastapi import APIRouter

from api.graph.data_store import load_graph
from api.schema import FundGraphResponse, ChainId, FundGraphEdge, ChainAddress
from api.utils import try_parse_obj_as

route = APIRouter(
    prefix="/graph",
)


@route.get("/{chain}/{address}", response_model=FundGraphResponse)
def get_address_graph(
        address: str,
        chain: ChainId,
):
    raise NotImplementedError


@route.get("/", response_model=FundGraphResponse)
def get_graph():
    edges: List[FundGraphEdge] = load_graph()
    return FundGraphResponse(edges=edges)
