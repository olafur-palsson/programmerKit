BEGIN {
	printnextline = 0
	customsection = 0
	print " # Some help docs for this kit"
	print ""
} {
	if(customsection == 1) {
		if($0 ~ /##/) {
			print ""
			print ""
			print ""
			print " " $0
			print ""
		} else if($0 ~ /alias/) {
			split($0, a, "alias")
			split(a[2], b, "=")
			print " " b[1]
			print ""
			printnextline = 1
		} else if($0 ~ /\(\)/) {
			split($0, a, "(")
			print " " a[1]
			print ""
			printnextline = 1
		} else if(printnextline == 1 && $0 ~ /#/) {
			print "     " $0
			print ""
		}
	}
	if($0 ~ /CUSTOM\ SETTINGS/) {
		customsection = 1
	}

}
