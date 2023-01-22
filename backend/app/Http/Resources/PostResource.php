<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\ImageSimpleResource;
use App\Http\Resources\CommentSimpleResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'user' => new UserResource($this->resource->user),
            'body' => $this->resource->body,
            'image' => new ImageSimpleResource($this->resource->image),
            'comments' => CommentSimpleResource::collection($this->resource->created_at),
            'created_at' => $this->resource->created_at,
        ];
    }
}
