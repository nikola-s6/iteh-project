<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\ImageSimpleResource;

class PostSimpleResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'user' => new UserResource($this->resource->user),
            'body' => $this->resource->body,
            'image' => new ImageSimpleResource($this->resource->image),
        ];
    }
}
