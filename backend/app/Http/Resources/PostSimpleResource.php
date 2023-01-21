<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostSimpleResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'user' => UserResource::collection($this->resource->user),
            'body' => $this->resource->body,
            'image' => ImageSimpleResource::collection($this->resource->image),
        ];
    }
}
