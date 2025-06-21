<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider; // <-- Phải kế thừa từ đây
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider // <-- Kế thừa đúng
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * The controller namespace for the application.
     *
     * When you import a controller, you can skip the root namespace.
     * For example, App\Http\Controllers\UserController can be just UserController.
     *
     * @var string|null
     */
    // protected $namespace = 'App\\Http\\Controllers'; // Laravel hiện đại ít dùng thuộc tính này trực tiếp ở đây, mà dùng namespace đầy đủ trong route.

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     *
     * @return void
     */
    public function boot()
    {
        // Cấu hình giới hạn tốc độ (rate limiting) - có thể có hoặc không tùy phiên bản Laravel
        $this->configureRateLimiting();

        // Đây là nơi các route được định nghĩa và nạp
        $this->routes(function () {
            // Định nghĩa các route API
            Route::middleware('api')
                ->prefix('api')
                // ->namespace($this->namespace) // Thường không cần dòng này nếu bạn dùng Controller::class trong route
                ->group(base_path('routes/api.php'));

            // Định nghĩa các route Web
            Route::middleware('web')
                // ->namespace($this->namespace) // Thường không cần dòng này nếu bạn dùng Controller::class trong route
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
