<?php
declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write('Hello world!');
        return $response;
    });
    $app->get('/api', function (Request $request, Response $response) {
        $link = mysqli_connect("localhost","root","","bulletin-board");

        $result = mysqli_query($link,"SELECT * FROM `messages` ");
        $datas = mysqli_fetch_all($result);

        $response->getBody()->write(json_encode($datas));
        
        return $response;
    });
    $app->post('/api2', function (Request $request, Response $response) {
 
            $response->getBody()->write('Hello');
       
        
        return $response;
    });
    $app->post('/api', function (Request $request, Response $response) {
        $param = $request->getQueryParams();
        $name = $param["name"];
        $messages = $param["messages"];
        if ($name != NULL and $messages != NULL){
            $link = mysqli_connect("localhost","root","","bulletin-board");
            $stmt = mysqli_prepare($link,"INSERT INTO messages(name,messages) VALUES(?,?)");
            mysqli_stmt_bind_param($stmt,"ss",$name,$messages);
            $result = mysqli_stmt_execute($stmt);
            mysqli_close($link);
            $response->getBody()->write(json_encode($result));
        }else{
            die("NOT HAVE INPUT");
        }
        
        
        return $response;
    });
    
    $app->group('/users', function (Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });
};
