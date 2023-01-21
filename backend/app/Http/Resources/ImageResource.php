<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public static $wrap = 'image';

    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'url' => $this->resource->url,
            'path' => $this->resource->path,
            'post' => new PostSimpleResource($this->resource->post),
        ];
    }
}
