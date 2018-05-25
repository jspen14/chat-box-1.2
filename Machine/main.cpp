// I am going to get this working with a JS/Node server

#include "src/sio_client.h"

#include <functional>
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <string>

//This is conditional based on what kind of machine you are using
    //Windows
#ifdef WIN32
#define HIGHLIGHT(__O__) std::cout<<__O__<<std::endl
#define EM(__O__) std::cout<<__O__<<std::endl

#include <stdio.h>
#include <tchar.h>
#define MAIN_FUNC int _tmain(int argc, _TCHAR* argv[])
    // Other
#else
#define HIGHLIGHT(__O__) std::cout<<"\e[1;31m"<<__O__<<"\e[0m"<<std::endl
#define EM(__O__) std::cout<<"\e[1;30;1m"<<__O__<<"\e[0m"<<std::endl

#define MAIN_FUNC int main(int argc ,const char* args[])
#endif
// End of machine based specifications

using namespace sio;
using namespace std;

std::mutex _lock;
std::condition_variable_any _cond;
// This is a generalization of the std:condition_variable. This can operate on any lock that meets the BasicLockable requirements.
     


int main(int argc, const char * argv[]) {
    
    sio::client h;
    h.connect("http://127.0.0.1:3000");
    
    h.socket() -> emit("login");
    
    cout << "This is the greatest show";
    return 0;
}
