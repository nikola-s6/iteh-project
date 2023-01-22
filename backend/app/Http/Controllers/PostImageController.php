<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImageSimpleResource;
use App\Models\Image;
use App\Models\Post;
use Illuminate\Http\Request;

class PostImageController extends Controller
{
    public function show($postID, $imageID)
    {
        $image = Image::get()->where('postID', $postID)->where('id', $imageID)->first();
        if (is_null($image)) {
            return response()->json(['message' => 'image not found'], 404);
        }
        return new ImageSimpleResource($image);
    }
}
