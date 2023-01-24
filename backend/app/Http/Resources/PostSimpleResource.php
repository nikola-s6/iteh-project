<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserSimpleResource;
use App\Http\Resources\ImageSimpleResource;
use App\Models\Like;

class PostSimpleResource extends JsonResource
{

    public function toArray($request)
    {
        $likes = Like::get()->where('postID', $this->resource->id);
        return [
            'id' => $this->resource->id,
            'user' => new UserSimpleResource($this->resource->user),
            'body' => $this->resource->body,
            'image' => new ImageSimpleResource($this->resource->image),
            'likes' => LikeResource::collection($likes),
        ];
    }
}
