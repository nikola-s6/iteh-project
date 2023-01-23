<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Image;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $posts = Post::all()->sortByDesc('created_at');
        return PostResource::collection($posts);
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
        // return response()->json($request);
        $validator = Validator::make($request->all(), [
            'body' => 'required|string',
            'image' => 'image'
        ]);


        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $post = Post::create(['userID' => auth()->user()->id, 'body' => $request->body]);

        //proveriti
        if ($request->hasFile('image')) {
            if (is_null($request->file('image'))) {
                return response()->json(['message' => 'new post added', 'post' => new PostResource($post)], 200);
            }
            $path = $request->file('image')->store('/public/images');
            $url = Storage::url($path);
            $image = Image::create(['postID' => $post->id, 'url' => $url, 'path' => $path]);
            $post->imageID = $image->id;
            $post->save();
        } else {
            return response()->json(['message' => 'new post added', 'post' => new PostResource($post)], 200);
        }
        return response()->json(['message' => 'new post added', 'post' => new PostResource($post)], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show($postID)
    {
        $post = Post::find($postID);
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
    public function destroy($postID)
    {
        $post = Post::find($postID);
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
