<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Http\Resources\CommentSimpleResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostCommentController extends Controller
{
    public function index($postID)
    {
        $comments = Comment::get()->where('postID', $postID);
        if (is_null($comments)) {
            return response()->json(['message' => 'comments not found'], 404);
        }
        return CommentSimpleResource::collection($comments);
    }

    public function show($postID, $commentID)
    {
        $comment = Comment::get()->where("postID", $postID)->where("id", $commentID)->first();
        if (is_null($comment)) {
            return response()->json(["message" => "comment not found"], 404);
        }
        return new CommentSimpleResource($comment);
    }

    public function update(Request $request, $postID, $commentID)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $post = Post::find($postID);
        if (is_null($post)) {
            return response()->json(['message' => 'post not found'], 404);
        }
        $comment = Comment::get()->where('postID', $postID)->where('id', $commentID)->first();
        if (is_null($comment)) {
            return response()->json(['message' => 'comment not found'], 404);
        }
        if (!($comment->userID === auth()->user()->id)) {
            return response()->json(['message' => 'only author can edit a comment'], 403);
        }
        $comment->update(['text' => $request->text]);
        return response()->json(['message' => 'comment updated', 'comment' => new CommentResource($comment)], 200);
    }
    public function store(Request $request, $postID)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $post = Post::find($postID);
        if (is_null($post)) {
            return response()->json(['message' => 'post not found'], 404);
        }
        $comment = Comment::create(['postID' => $post->id, 'userID' => auth()->user()->id, 'text' => $request->text]);
        return response()->json(['message' => 'comment created', 'comment' => new CommentSimpleResource($comment)], 200);
    }
    public function destroy($postID, $commentID)
    {
        $comment = Comment::get()->where('postID', $postID)->where('id', $commentID)->first();
        if (is_null($comment)) {
            return response()->json(["message" => "comment not found!"], 404);
        }
        if (!($comment->userID === auth()->user()->id)) {
            return response()->json(['message' => 'only author can delete a comment'], 403);
        }
        $comment->delete();
        return response()->json(['message' => 'comment deleted'], 200);
    }
}
