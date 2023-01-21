<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public static $wrap = 'comment';

    public function toArray($request)
    {
        //  return parent::toArray($request);

        return [
            'id' => $this->resource->id,
            'body' => $this->resource->body,
            'user' => new UserSimpleResource($this->resource->commenter),
            'post' => new PostSimpleReosurce($this->resource->post),
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at
        ];
    }
}
