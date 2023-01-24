<?php

namespace App\Http\Controllers;

use App\Http\Resources\LikeResource;
use App\Http\Resources\PostLikeResource;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Psy\TabCompletion\Matcher\FunctionsMatcher;

class PostLikeController extends Controller
{
    public function index($postID)
    {
        $likes = Like::get()->where('postID', $postID);
        return LikeResource::collection($likes);
    }

    public function store($postID)
    {
        $post = Post::find($postID);
        if (is_null($post)) {
            return response()->json(['message' => 'post not found'], 403);
        }
        $like = Like::create(['postID' => $postID, 'userID' => auth()->user()->id]);
        return response()->json(['message' => 'post liked'], 200);
    }
    public function destroy($postID, $userID)
    {
        $like = Like::get()->where('postID', $postID)->where('userID', $userID)->first();
        if (is_null($like)) {
            return response()->json(['message', 'post not liked']);
        }
        if (!($like->userID === auth()->user()->id)) {
            return response()->json(['message' => 'only liker can unlike post'], 403);
        }
        $like->delete();
        return response()->json(['message' => 'post unliked'], 200);
    }
}
