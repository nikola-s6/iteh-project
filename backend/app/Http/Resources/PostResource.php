<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'user' => UserResource::collection($this->resource->user),
            'body' => $this->resource->body,
            'image' => ImageSimpleResource::collection($this->resource->image),
            'comments' => $this->resource->comments,
            'created_at' => CommentSimpleResource::collection($this->resource->created_at),
        ];
    }
}
