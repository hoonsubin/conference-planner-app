type Role = 'system' | 'user';

interface PerpMessage {
    role: Role;
    content: string;
}

interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

interface Delta {
    role: Role;
    content: string;
}

interface Choice {
    index: number;
    finish_reason: string;
    message: PerpMessage;
    delta: Delta;
}

type RecencyFilterType = 'month' | 'week' | 'day' | 'hour';

// interface only used to interact with Perplexity AI
export interface PerplexityApiReq {
    model: string;
    messages: PerpMessage[];
    temperature?: number;
    top_p?: number;
    search_domain_filter?: string[];
    return_images?: boolean;
    return_related_questions?: boolean;
    search_recency_filter?: RecencyFilterType;
    top_k?: number;
    stream?: boolean;
    presence_penalty?: number;
    frequency_penalty?: number;
    max_tokens?: number;
}

export interface PerplexityApiRes {
    id: string;
    model: string;
    created: number;
    usage: Usage;
    citations: string[];
    object: string;
    choices: Choice[];
}
