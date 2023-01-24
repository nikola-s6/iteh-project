<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\ImageSimpleResource;
use App\Http\Resources\CommentSimpleResource;
use App\Models\Comment;
use App\Models\Like;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        $comments = Comment::get()->where('postID', $this->resource->id);
        $likes = Like::get()->where('postID', $this->resource->id);
        return [
            'id' => $this->resource->id,
            'user' => new UserSimpleResource($this->resource->user),
            'body' => $this->resource->body,
            'image' => new ImageSimpleResource($this->resource->image),
            'comments' => CommentSimpleResource::collection($comments),
            'likes' => LikeResource::collection($likes),
            'created_at' => $this->resource->created_at,
        ];
    }
}
