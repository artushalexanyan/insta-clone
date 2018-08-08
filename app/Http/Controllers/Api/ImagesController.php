<?php

namespace App\Http\Controllers\Api;

use App\Image;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $images = Image::orderBy("id", "DESC")->paginate(5);
    
        return response()->json($images);
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
    /*public function store(Request $request)
    {
        $image = new Image();

        $image->img_title = $request->get('img_title');
        $image->likes = 0;
        $image->user_id = $request->get('user_id');
        $image->description = $request->get('description');
        $image->path = $request->get('path');

        $image->save();

        return $image;
    }*/

    public function store(Request $request){
        $image_name = $request->get('name');
        $description = $request->get('description');
        $image = $request->get('image');
        
        $indexOfLastPoint = strrpos($image_name, '.');
        $format = substr($image_name, $indexOfLastPoint);

        $base64_str = substr($image, strpos($image, ",")+1);

        $image = base64_decode($base64_str);
        $img_url = substr($image_name, 0, $indexOfLastPoint) . "-" . time() . $format;
        $path = public_path() . '/pictures/' . $img_url;

        $result = file_put_contents($path, $image);

        /*DB::table('images')->insert(
            ['img_title' => $image_name, 'likes' => 0, 'user_id' => 0, 'description' => $description, 'path' => $image_name]
        );*/

        $image = new Image();

        $image->img_title = $img_url;
        $image->likes = 0;
        $image->user_id = 0;
        $image->description = $description ? $description : '';
        $image->path = $img_url;

        $image->save();
        
        return response()->json([ "status" => "success" ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
