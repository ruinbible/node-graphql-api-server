interface Query {
    id: string;
    text: string;
}

class QueryStore {
    data: Array<Query>;

    constructor(queries: Array<Query> = []) {
        this.data = queries;
    }

    getQuery(id: string): string {
        const q = this.data.filter(x => x.id === id);
        if (q.length) {
            return q[0].text;
        } else {
            throw `Query id cannot found: ${id}.`;
        }
    }
}

export default QueryStore;