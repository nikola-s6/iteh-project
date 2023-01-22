<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Psy\TabCompletion\Matcher\FunctionsMatcher;

class PostLikeController extends Controller
{
    public function index($postID)
    {
        $numberOfLikes = Like::where('postID', $postID)->count();
        return response()->json(['message' => 'number of likes for post', 'count' => $numberOfLikes], 200);
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
    public function destroy($postID, $commentID)
    {
        $like = Like::get()->where('postID', $postID)->where('id', $commentID)->first();
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
