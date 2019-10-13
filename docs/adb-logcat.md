Usage: logcat [options] [filterspecs]
options include:
  -s              Set default filter to silent.
                  Like specifying filterspec '*:S'
  -f <filename>   Log to file. Default is stdout
  --file=<filename>
  -r <kbytes>     Rotate log every kbytes. Requires -f
  --rotate-kbytes=<kbytes>
  -n <count>      Sets max number of rotated logs to <count>, default 4
  --rotate-count=<count>
  -v <format>     Sets the log print format, where <format> is:
  --format=<format>
                      brief color epoch long monotonic printable process raw
                      tag thread threadtime time uid usec UTC year zone

  -D              print dividers between each log buffer
  --dividers
  -c              clear (flush) the entire log and exit
  --clear
  -d              dump the log and then exit (don't block)
  -e <expr>       only print lines where the log message matches <expr>
  --regex <expr>  where <expr> is a regular expression
  -m <count>      quit after printing <count> lines. This is meant to be
  --max-count=<count> paired with --regex, but will work on its own.
  --print         paired with --regex and --max-count to let content bypass
                  regex filter but still stop at number of matches.
  -t <count>      print only the most recent <count> lines (implies -d)
  -t '<time>'     print most recent lines since specified time (implies -d)
  -T <count>      print only the most recent <count> lines (does not imply -d)
  -T '<time>'     print most recent lines since specified time (not imply -d)
                  count is pure numerical, time is 'MM-DD hh:mm:ss.mmm...'
                  'YYYY-MM-DD hh:mm:ss.mmm...' or 'sssss.mmm...' format
  -g              get the size of the log's ring buffer and exit
  --buffer-size
  -G <size>       set size of log ring buffer, may suffix with K or M.
  --buffer-size=<size>
  -L              dump logs from prior to last reboot
  --last
  -b <buffer>     Request alternate ring buffer, 'main', 'system', 'radio',
  --buffer=<buffer> 'events', 'crash', 'default' or 'all'. Multiple -b
                  parameters are allowed and results are interleaved. The
                  default is -b main -b system -b crash.
  -B              output the log in binary.
  --binary
  -S              output statistics.
  --statistics
  -p              print prune white and ~black list. Service is specified as
  --prune         UID, UID/PID or /PID. Weighed for quicker pruning if prefix
                  with ~, otherwise weighed for longevity if unadorned. All
                  other pruning activity is oldest first. Special case ~!
                  represents an automatic quicker pruning for the noisiest
                  UID as determined by the current statistics.
  -P '<list> ...' set prune white and ~black list, using same format as
  --prune='<list> ...'  printed above. Must be quoted.
  --pid=<pid>     Only prints logs from the given pid.
  --wrap          Sleep for 2 hours or when buffer about to wrap whichever
                  comes first. Improves efficiency of polling by providing
                  an about-to-wrap wakeup.

filterspecs are a series of 
  <tag>[:priority]

where <tag> is a log component tag (or * for all) and priority is:
  V    Verbose (default for <tag>)
  D    Debug (default for '*')
  I    Info
  W    Warn
  E    Error
  F    Fatal
  S    Silent (suppress all output)

'*' by itself means '*:D' and <tag> by itself means <tag>:V.
If no '*' filterspec or -s on command line, all filter defaults to '*:V'.
eg: '*:S <tag>' prints only <tag>, '<tag>:S' suppresses all <tag> log messages.

If not specified on the command line, filterspec is set from ANDROID_LOG_TAGS.

If not specified with -v on command line, format is set from ANDROID_PRINTF_LOG
or defaults to "threadtime"
