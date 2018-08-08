<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Support\Facades\Auth;

Route::resource('users', 'UserController');
Route::resource('images', 'ImagesController');

Route::get('/', function () {
    return view('images');
});

Route::get('logout', function () {
    Auth::logout();

    return redirect('');
});

Route::post('/is_user_logged_in', function (Request $request) {

    if(Auth::check()) {
        return response()->json([
            'user' => Auth::check()
        ]);
    } else {
        return response()->json([
            'user' => Auth::check()
        ]);
    }
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
