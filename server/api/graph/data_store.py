import json
from typing import List

from api.schema import FundGraphEdge
from api.utils import try_parse_obj_as


def load_graph() -> List[FundGraphEdge]:
    with open('../data.json') as f:
        json_data: str = f.read()
    edges: List[FundGraphEdge] | None = try_parse_obj_as(List[FundGraphEdge], json.loads(json_data))
    if not edges:
        raise Exception("Failed to load graph")
    return edges
