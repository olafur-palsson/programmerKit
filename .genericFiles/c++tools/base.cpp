
#include "filename.hpp"
#include <iostream>

using namespace std;

filename() {
	cout << "Constructed a filename" << endl;
}

~filename() {
	cout << "Deleted a filename" << endl;
}

int main() {
	filename* instanceOffilename = new filename();
	delete instanceOffilename;
}

