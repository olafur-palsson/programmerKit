
#include "filename.hpp"
#include <iostream>

using namespace std;

filename::filename() {
	cout << "Constructed a filename" << endl;
}

filename::~filename() {
	cout << "Deleted a filename" << endl;
}

int main() {
	filename* instanceOffilename = new filename();
	delete instanceOffilename;
	return 1;
}

