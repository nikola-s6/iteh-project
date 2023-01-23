<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\ImageSimpleResource;
use App\Http\Resources\CommentSimpleResource;
use App\Models\Comment;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        $comments = Comment::get()->where('postID', $this->resource->id);
        return [
            'id' => $this->resource->id,
            'user' => new UserSimpleResource($this->resource->user),
            'body' => $this->resource->body,
            'image' => new ImageSimpleResource($this->resource->image),
            'comments' => CommentSimpleResource::collection($comments),
            'created_at' => $this->resource->created_at,
        ];
    }
}
