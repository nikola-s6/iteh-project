<?php

namespace App\Http\Resources;

use App\Models\Post;
use App\Http\Resources\PostSimpleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{

    public function toArray($request)
    {
        $posts = Post::get()->where('userID', $this->resource->id);

        return [
            'id' => $this->resource->id,
            'username' => $this->resource->username,
            'email' => $this->resource->email,
            'posts' => PostSimpleResource::collection($posts),
        ];
    }
}