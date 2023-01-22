<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Image;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PostResource::collection(Post::all()->sortByDesc('created_at'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'body' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $post = Post::create(['userID' => auth()->user()->id, 'body' => $request->body]);

        //proveriti
        if (!$request->imageID) {
            return response()->json(['message' => 'new post added', 'post' => new PostResource($post)], 200);
        }

        $image = Image::find($request->imageID);

        if (!$image) {
            return response()->json(['message' => 'image not found'], 404);
        }

        $image->imageID = $image->id;

        return response()->json(['message' => 'new post added', 'post' => new PostResource($post)], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show($post_id)
    {
        $post = Post::find($post_id);
        if (is_null($post)) {
            return response()->json(['message' => 'post not found'], 404);
        }
        return new PostResource($post);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy($post_id)
    {
        $post = Post::find($post_id);
        if (is_null($post)) {
            return response()->json(['message' => 'post not found'], 404);
        }
        if (!($post->userID === auth()->user()->id)) {
            return response()->json(['message' => 'only author can delete post'], 403);
        }
        $post->delete();
        return response()->json(['message' => 'post deleted'], 200);
    }
}
