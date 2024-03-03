# Node Server Benchmark

This is a totally unscientific benchmark of a few frameworks (or libraries) that I used to work with for Node.js environment.

To run the benchmark yourself, see [RUN_YOURSELF.md](./RUN_YOURSELF.md).

**Machine A**:
* AMD EPYC 7642 (4 core) @ 2.295GHz
* 7940MiB RAM
* Debian GNU/Linux 12 (bookworm) x86_64
* Kernel 6.1.0-18-amd64

**Machine B**:
* 11th Gen Intel i7-11700 (16 core) @ 4.800GHz
* 31853MiB RAM
* Fedora Linux 39 (Workstation Edition) x86_64
* Kernel 6.7.5-200.fc39.x86_64

## Summary

I know you're here just to see the RPS, so here it is:

| Framework | `hello-world` rps | `name` rps | `post-body` rps | Factor |
| --------- | ----------------- | ---------- | --------------- | ------ |
| Express   | 12435             | 11683      | 8444            | 1x     |
| Fastify   | 45823             | 44351      | 27504           | 3.61x  |
| Polka     | 53965             | 51819      | 32245           | 4.23x  |
| Hono      | 25027             | 23454      | 3615            | 1.59x  |

How do I calculate the "Factor"? Simple enough:
1. Find the average of the first row `(12435 + 11683 + 8444) / 3`, I got `10854.0`
2. Make the first row as a base, no matter if everything else is slower/faster.
3. Find the average of the next row that we're counting, in this case, it's Fastify, so: `(45823 + 44351 + 27504) / 3`, I got `39226.0`.
4. Divide the current row by the first row. `39226.0 / 10854.0`, it's `3.6139672010318775`. The factor therefore is `3.61x`.

## Express

### `hello-world.js`

On **MACHINE A**
```
     execution: local
        script: hello-world.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 680 MB  1.2 MB/s
     data_sent......................: 213 MB  366 kB/s
     http_req_blocked...............: avg=1.43µs  min=612ns    med=1.03µs max=9.49ms  p(90)=1.83µs  p(95)=2.25µs 
     http_req_connecting............: avg=17ns    min=0s       med=0s     max=9.4ms   p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=4.7ms   min=147.99µs med=3.67ms max=75.09ms p(90)=7.88ms  p(95)=9.14ms 
       { expected_response:true }...: avg=4.7ms   min=147.99µs med=3.67ms max=75.09ms p(90)=7.88ms  p(95)=9.14ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 2656264
     http_req_receiving.............: avg=25.07µs min=8.9µs    med=20.3µs max=15.98ms p(90)=37.84µs p(95)=45.84µs
     http_req_sending...............: avg=7.28µs  min=2.97µs   med=5.26µs max=16.12ms p(90)=8.86µs  p(95)=12.03µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s     max=0s      p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=4.67ms  min=128.94µs med=3.64ms max=75.03ms p(90)=7.85ms  p(95)=9.1ms  
     http_reqs......................: 2656264 4571.81431/s
     iteration_duration.............: avg=4.74ms  min=172.57µs med=3.71ms max=75.4ms  p(90)=7.92ms  p(95)=9.18ms 
     iterations.....................: 2656264 4571.81431/s
     vus............................: 49      min=0        max=49   
     vus_max........................: 50      min=50       max=50   


running (09m41.0s), 00/50 VUs, 2656264 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.4s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s 
```

On **MACHINE B**
```
     execution: local
        script: hello-world.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 1.8 GB  3.2 MB/s
     data_sent......................: 578 MB  995 kB/s
     http_req_blocked...............: avg=585ns  min=399ns   med=537ns  max=1.15ms   p(90)=623ns   p(95)=720ns  
     http_req_connecting............: avg=1ns    min=0s      med=0s     max=402.87µs p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=1.72ms min=71.36µs med=1.33ms max=29.18ms  p(90)=2.88ms  p(95)=3.17ms 
       { expected_response:true }...: avg=1.72ms min=71.36µs med=1.33ms max=29.18ms  p(90)=2.88ms  p(95)=3.17ms 
     http_req_failed................: 0.00%   ✓ 0            ✗ 7225045
     http_req_receiving.............: avg=8.93µs min=4.55µs  med=8.49µs max=12.8ms   p(90)=10.34µs p(95)=11.23µs
     http_req_sending...............: avg=2.48µs min=1.95µs  med=2.34µs max=1.97ms   p(90)=2.71µs  p(95)=2.97µs 
     http_req_tls_handshaking.......: avg=0s     min=0s      med=0s     max=0s       p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=1.71ms min=60.1µs  med=1.32ms max=29.09ms  p(90)=2.87ms  p(95)=3.16ms 
     http_reqs......................: 7225045 12435.447266/s
     iteration_duration.............: avg=1.74ms min=83.8µs  med=1.35ms max=29.68ms  p(90)=2.89ms  p(95)=3.19ms 
     iterations.....................: 7225045 12435.447266/s
     vus............................: 49      min=0          max=49   
     vus_max........................: 50      min=50         max=50   


running (09m41.0s), 00/50 VUs, 7225045 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.1s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s     
```

### `name.js`

On **MACHINE A**:
```
     execution: local
        script: name.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 649 MB  1.1 MB/s
     data_sent......................: 232 MB  399 kB/s
     http_req_blocked...............: avg=1.72µs  min=612ns    med=1.21µs  max=15.51ms p(90)=2.07µs  p(95)=2.57µs 
     http_req_connecting............: avg=9ns     min=0s       med=0s      max=6.79ms  p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=4.77ms  min=150.79µs med=3.72ms  max=69.95ms p(90)=8.04ms  p(95)=9.48ms 
       { expected_response:true }...: avg=4.77ms  min=150.79µs med=3.72ms  max=69.95ms p(90)=8.04ms  p(95)=9.48ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 2604662
     http_req_receiving.............: avg=27.47µs min=7.59µs   med=22.19µs max=21.15ms p(90)=40.98µs p(95)=49.03µs
     http_req_sending...............: avg=8.59µs  min=3.04µs   med=5.99µs  max=18.34ms p(90)=10.7µs  p(95)=17.17µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s      p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=4.73ms  min=127.24µs med=3.69ms  max=69.89ms p(90)=8ms     p(95)=9.44ms 
     http_reqs......................: 2604662 4483.003056/s
     iteration_duration.............: avg=4.83ms  min=185.59µs med=3.78ms  max=76.94ms p(90)=8.1ms   p(95)=9.55ms 
     iterations.....................: 2604662 4483.003056/s
     vus............................: 49      min=0         max=49   
     vus_max........................: 50      min=50        max=50   


running (09m41.0s), 00/50 VUs, 2604662 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.2s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s   
```

On **MACHINE B**:
```
     execution: local
        script: name.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 1.7 GB  2.9 MB/s
     data_sent......................: 604 MB  1.0 MB/s
     http_req_blocked...............: avg=614ns  min=421ns   med=565ns  max=1.12ms   p(90)=646ns   p(95)=783ns
     http_req_connecting............: avg=1ns    min=0s      med=0s     max=381.15µs p(90)=0s      p(95)=0s
     http_req_duration..............: avg=1.83ms min=72.6µs  med=1.41ms max=28.4ms   p(90)=3.06ms  p(95)=3.39ms
       { expected_response:true }...: avg=1.83ms min=72.6µs  med=1.41ms max=28.4ms   p(90)=3.06ms  p(95)=3.39ms
     http_req_failed................: 0.00%   ✓ 0            ✗ 6788466
     http_req_receiving.............: avg=9.24µs min=4.78µs  med=8.57µs max=24.56ms  p(90)=10.53µs p(95)=11.45µs
     http_req_sending...............: avg=2.62µs min=2.02µs  med=2.46µs max=2.79ms   p(90)=2.86µs  p(95)=3.13µs
     http_req_tls_handshaking.......: avg=0s     min=0s      med=0s     max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=1.82ms min=63.04µs med=1.4ms  max=21.76ms  p(90)=3.05ms  p(95)=3.38ms
     http_reqs......................: 6788466 11683.982768/s
     iteration_duration.............: avg=1.85ms min=90.38µs med=1.43ms max=29.63ms  p(90)=3.08ms  p(95)=3.41ms
     iterations.....................: 6788466 11683.982768/s
     vus............................: 49      min=0          max=49
     vus_max........................: 50      min=50         max=50


running (09m41.0s), 00/50 VUs, 6788466 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.1s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s
ramping  ✓ [======================================] 00/50 VUs  3m41s
```

### `post-body.js`

On MACHINE A:
```
     execution: local
        script: post-body.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 1.4 GB  2.3 MB/s
     data_sent......................: 1.2 GB  2.0 MB/s
     http_req_blocked...............: avg=1.68µs  min=632ns    med=1.25µs max=8.08ms  p(90)=2.09µs  p(95)=2.47µs 
     http_req_connecting............: avg=18ns    min=0s       med=0s     max=8.01ms  p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=6.73ms  min=238.23µs med=5.34ms max=97.15ms p(90)=11.36ms p(95)=13.39ms
       { expected_response:true }...: avg=6.73ms  min=238.23µs med=5.34ms max=97.15ms p(90)=11.36ms p(95)=13.39ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 1848917
     http_req_receiving.............: avg=28.77µs min=9.55µs   med=23.6µs max=14.96ms p(90)=42.21µs p(95)=50.22µs
     http_req_sending...............: avg=12.16µs min=4.49µs   med=8.26µs max=21.87ms p(90)=17.52µs p(95)=23.29µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s     max=0s      p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=6.69ms  min=201.57µs med=5.3ms  max=97.08ms p(90)=11.31ms p(95)=13.33ms
     http_reqs......................: 1848917 3182.228947/s
     iteration_duration.............: avg=6.81ms  min=290.88µs med=5.42ms max=97.54ms p(90)=11.44ms p(95)=13.48ms
     iterations.....................: 1848917 3182.228947/s
     vus............................: 49      min=0         max=49   
     vus_max........................: 50      min=50        max=50   


running (09m41.0s), 00/50 VUs, 1848917 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.4s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s  
```

On MACHINE B:
```
     execution: local
        script: post-body.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 3.6 GB  6.2 MB/s
     data_sent......................: 3.1 GB  5.4 MB/s
     http_req_blocked...............: avg=676ns  min=483ns    med=621ns  max=1.47ms  p(90)=721ns   p(95)=878ns
     http_req_connecting............: avg=3ns    min=0s       med=0s     max=1.33ms  p(90)=0s      p(95)=0s
     http_req_duration..............: avg=2.53ms min=108.34µs med=1.96ms max=28.15ms p(90)=4.23ms  p(95)=4.7ms
       { expected_response:true }...: avg=2.53ms min=108.34µs med=1.96ms max=28.15ms p(90)=4.23ms  p(95)=4.7ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 4906555
     http_req_receiving.............: avg=9.63µs min=4.67µs   med=8.97µs max=7.19ms  p(90)=11.01µs p(95)=12.19µs
     http_req_sending...............: avg=3.63µs min=2.87µs   med=3.41µs max=1.18ms  p(90)=3.91µs  p(95)=4.37µs
     http_req_tls_handshaking.......: avg=0s     min=0s       med=0s     max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=2.52ms min=98.12µs  med=1.94ms max=28.1ms  p(90)=4.22ms  p(95)=4.69ms
     http_reqs......................: 4906555 8444.930896/s
     iteration_duration.............: avg=2.56ms min=136.06µs med=1.99ms max=29.05ms p(90)=4.26ms  p(95)=4.73ms
     iterations.....................: 4906555 8444.930896/s
     vus............................: 49      min=0         max=49
     vus_max........................: 50      min=50        max=50


running (09m41.0s), 00/50 VUs, 4906555 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.1s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s
ramping  ✓ [======================================] 00/50 VUs  3m41s
```

## Fastify

### `hello-world.js`

On MACHINE A:
```
     execution: local
        script: hello-world.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 2.8 GB   4.7 MB/s
     data_sent......................: 1.1 GB   2.0 MB/s
     http_req_blocked...............: avg=1.54µs   min=492ns   med=912ns    max=20.55ms p(90)=1.64µs  p(95)=2.02µs 
     http_req_connecting............: avg=1ns      min=0s      med=0s       max=7.02ms  p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=830.94µs min=42.53µs med=632.75µs max=54.39ms p(90)=1.46ms  p(95)=1.91ms 
       { expected_response:true }...: avg=830.94µs min=42.53µs med=632.75µs max=54.39ms p(90)=1.46ms  p(95)=1.91ms 
     http_req_failed................: 0.00%    ✓ 0            ✗ 14366867
     http_req_receiving.............: avg=25.62µs  min=6.64µs  med=14.29µs  max=42.71ms p(90)=23.35µs p(95)=28.15µs
     http_req_sending...............: avg=8.22µs   min=2.49µs  med=4.98µs   max=38.59ms p(90)=7.93µs  p(95)=9.34µs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=797.09µs min=29.24µs med=609.51µs max=40.58ms p(90)=1.43ms  p(95)=1.85ms 
     http_reqs......................: 14366867 24727.719429/s
     iteration_duration.............: avg=869.01µs min=61.38µs med=662.58µs max=54.45ms p(90)=1.5ms   p(95)=1.96ms 
     iterations.....................: 14366867 24727.719429/s
     vus............................: 2        min=0          max=49    
     vus_max........................: 50       min=50         max=50    


running (09m41.0s), 00/50 VUs, 14366867 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.2s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s    
```

On MACHINE B:
```
     execution: local
        script: hello-world.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 5.1 GB   8.8 MB/s
     data_sent......................: 2.1 GB   3.7 MB/s
     http_req_blocked...............: avg=539ns    min=327ns   med=488ns    max=33.72ms  p(90)=606ns    p(95)=787ns
     http_req_connecting............: avg=0ns      min=0s      med=0s       max=440.16µs p(90)=0s       p(95)=0s
     http_req_duration..............: avg=457.57µs min=23.28µs med=344.71µs max=58.44ms  p(90)=771.31µs p(95)=855.68µs
       { expected_response:true }...: avg=457.57µs min=23.28µs med=344.71µs max=58.44ms  p(90)=771.31µs p(95)=855.68µs
     http_req_failed................: 0.00%    ✓ 0           ✗ 26623661
     http_req_receiving.............: avg=6.71µs   min=3.9µs   med=6.17µs   max=57.97ms  p(90)=7.75µs   p(95)=9.08µs
     http_req_sending...............: avg=2.43µs   min=1.77µs  med=2.24µs   max=33.7ms   p(90)=2.76µs   p(95)=3.21µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=448.42µs min=16.52µs med=335.69µs max=33.2ms   p(90)=762.13µs p(95)=846.65µs
     http_reqs......................: 26623661 45823.77546/s
     iteration_duration.............: avg=470.89µs min=35.4µs  med=357.95µs max=58.87ms  p(90)=784.57µs p(95)=868.6µs
     iterations.....................: 26623661 45823.77546/s
     vus............................: 49       min=0         max=49
     vus_max........................: 50       min=50        max=50


running (09m41.0s), 00/50 VUs, 26623661 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.1s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s
ramping  ✓ [======================================] 00/50 VUs  3m41s
```

### `name.js`

On MACHINE A:
```
     execution: local
        script: name.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 2.3 GB   4.0 MB/s
     data_sent......................: 1.1 GB   1.9 MB/s
     http_req_blocked...............: avg=1.87µs   min=521ns   med=992ns    max=24.19ms  p(90)=1.76µs  p(95)=2.21µs 
     http_req_connecting............: avg=5ns      min=0s      med=0s       max=11.56ms  p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=942.03µs min=46.57µs med=654.23µs max=195.85ms p(90)=1.71ms  p(95)=2.35ms 
       { expected_response:true }...: avg=942.03µs min=46.57µs med=654.23µs max=195.85ms p(90)=1.71ms  p(95)=2.35ms 
     http_req_failed................: 0.00%    ✓ 0         ✗ 12407595
     http_req_receiving.............: avg=30.95µs  min=6.6µs   med=15.16µs  max=195.21ms p(90)=24.13µs p(95)=28.78µs
     http_req_sending...............: avg=10.45µs  min=2.71µs  med=5.47µs   max=126.56ms p(90)=8.87µs  p(95)=10.4µs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=900.61µs min=33.81µs med=629.42µs max=96.4ms   p(90)=1.67ms  p(95)=2.27ms 
     http_reqs......................: 12407595 21355.494/s
     iteration_duration.............: avg=1ms      min=76.03µs med=700.21µs max=195.96ms p(90)=1.78ms  p(95)=2.46ms 
     iterations.....................: 12407595 21355.494/s
     vus............................: 49       min=0       max=49    
     vus_max........................: 50       min=50      max=50 

running (09m41.0s), 00/50 VUs, 12407595 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.1s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s   
```

On MACHINE B:
```
     execution: local
        script: name.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 4.8 GB   8.2 MB/s
     data_sent......................: 2.3 GB   3.9 MB/s
     http_req_blocked...............: avg=562ns    min=350ns   med=506ns    max=1.32ms   p(90)=654ns    p(95)=856ns
     http_req_connecting............: avg=0ns      min=0s      med=0s       max=515.23µs p(90)=0s       p(95)=0s
     http_req_duration..............: avg=467.5µs  min=26.16µs med=347.45µs max=31.7ms   p(90)=787.57µs p(95)=877.75µs
       { expected_response:true }...: avg=467.5µs  min=26.16µs med=347.45µs max=31.7ms   p(90)=787.57µs p(95)=877.75µs
     http_req_failed................: 0.00%    ✓ 0            ✗ 25768122
     http_req_receiving.............: avg=6.87µs   min=3.92µs  med=6.31µs   max=30.99ms  p(90)=8.11µs   p(95)=9.56µs
     http_req_sending...............: avg=2.59µs   min=1.91µs  med=2.38µs   max=6.13ms   p(90)=2.95µs   p(95)=3.47µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=458.03µs min=18.27µs med=338.17µs max=9.09ms   p(90)=778.07µs p(95)=868.29µs
     http_reqs......................: 25768122 44351.211462/s
     iteration_duration.............: avg=486.56µs min=42.31µs med=366.31µs max=31.75ms  p(90)=806.52µs p(95)=896.5µs
     iterations.....................: 25768122 44351.211462/s
     vus............................: 49       min=0          max=49
     vus_max........................: 50       min=50         max=50


running (09m41.0s), 00/50 VUs, 25768122 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.0s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s
ramping  ✓ [======================================] 00/50 VUs  3m41s
```

### `post-body.js`

On MACHINE A:
```
     execution: local
        script: post-body.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 5.2 GB  9.0 MB/s
     data_sent......................: 4.9 GB  8.5 MB/s
     http_req_blocked...............: avg=1.76µs  min=510ns    med=1.11µs  max=26.79ms p(90)=1.95µs  p(95)=2.31µs 
     http_req_connecting............: avg=5ns     min=0s       med=0s      max=7.18ms  p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=1.53ms  min=78.5µs   med=1.2ms   max=57.64ms p(90)=2.66ms  p(95)=3.29ms 
       { expected_response:true }...: avg=1.53ms  min=78.5µs   med=1.2ms   max=57.64ms p(90)=2.66ms  p(95)=3.29ms 
     http_req_failed................: 0.00%   ✓ 0            ✗ 7773608
     http_req_receiving.............: avg=25.52µs min=7.25µs   med=16.92µs max=35.94ms p(90)=28.68µs p(95)=35.2µs 
     http_req_sending...............: avg=11.69µs min=3.48µs   med=7.52µs  max=38.6ms  p(90)=12.16µs p(95)=14.24µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s      p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=1.49ms  min=57.47µs  med=1.17ms  max=57.6ms  p(90)=2.62ms  p(95)=3.24ms 
     http_reqs......................: 7773608 13379.573416/s
     iteration_duration.............: avg=1.61ms  min=122.62µs med=1.27ms  max=57.71ms p(90)=2.75ms  p(95)=3.41ms 
     iterations.....................: 7773608 13379.573416/s
     vus............................: 49      min=0          max=49   
     vus_max........................: 50      min=50         max=50   


running (09m41.0s), 00/50 VUs, 7773608 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.2s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s  
```

On MACHINE B:
```
     execution: local
        script: post-body.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 11 GB    19 MB/s
     data_sent......................: 10 GB    18 MB/s
     http_req_blocked...............: avg=663ns    min=414ns   med=610ns    max=1ms      p(90)=770ns  p(95)=943ns
     http_req_connecting............: avg=0ns      min=0s      med=0s       max=680.83µs p(90)=0s     p(95)=0s
     http_req_duration..............: avg=756.38µs min=42.96µs med=561.51µs max=39.18ms  p(90)=1.27ms p(95)=1.41ms
       { expected_response:true }...: avg=756.38µs min=42.96µs med=561.51µs max=39.18ms  p(90)=1.27ms p(95)=1.41ms
     http_req_failed................: 0.00%    ✓ 0            ✗ 15979937
     http_req_receiving.............: avg=7.62µs   min=4.18µs  med=6.91µs   max=36.69ms  p(90)=9.06µs p(95)=10.57µs
     http_req_sending...............: avg=3.62µs   min=2.6µs   med=3.35µs   max=2.05ms   p(90)=4.17µs p(95)=4.79µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s     p(95)=0s
     http_req_waiting...............: avg=745.14µs min=33.65µs med=550.51µs max=30.55ms  p(90)=1.26ms p(95)=1.4ms
     http_reqs......................: 15979937 27504.112499/s
     iteration_duration.............: avg=786.22µs min=68.25µs med=591.17µs max=39.27ms  p(90)=1.3ms  p(95)=1.44ms
     iterations.....................: 15979937 27504.112499/s
     vus............................: 49       min=0          max=49
     vus_max........................: 50       min=50         max=50


running (09m41.0s), 00/50 VUs, 15979937 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.1s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s
ramping  ✓ [======================================] 00/50 VUs  3m41s
```

## Polka

### `hello-world.js`

On MACHINE A:
```
     execution: local
        script: hello-world.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 2.2 GB   3.8 MB/s
     data_sent......................: 1.1 GB   1.9 MB/s
     http_req_blocked...............: avg=1.48µs   min=521ns   med=942ns    max=20.49ms p(90)=1.68µs  p(95)=2.04µs 
     http_req_connecting............: avg=3ns      min=0s      med=0s       max=12.39ms p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=886.89µs min=55.22µs med=738.2µs  max=50.66ms p(90)=1.52ms  p(95)=1.96ms 
       { expected_response:true }...: avg=886.89µs min=55.22µs med=738.2µs  max=50.66ms p(90)=1.52ms  p(95)=1.96ms 
     http_req_failed................: 0.00%    ✓ 0            ✗ 13540520
     http_req_receiving.............: avg=23.43µs  min=6.95µs  med=14.89µs  max=40.79ms p(90)=25.32µs p(95)=30.57µs
     http_req_sending...............: avg=7.56µs   min=2.5µs   med=5.05µs   max=31.25ms p(90)=8.08µs  p(95)=9.47µs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=855.89µs min=38.91µs med=713.68µs max=37.76ms p(90)=1.48ms  p(95)=1.91ms 
     http_reqs......................: 13540520 23305.395793/s
     iteration_duration.............: avg=922.95µs min=75.86µs med=769.07µs max=50.69ms p(90)=1.56ms  p(95)=2.01ms 
     iterations.....................: 13540520 23305.395793/s
     vus............................: 49       min=0          max=49    
     vus_max........................: 50       min=50         max=50    


running (09m41.0s), 00/50 VUs, 13540520 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.2s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s 
```

On MACHINE B:
```
     execution: local
        script: hello-world.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 5.1 GB   8.8 MB/s
     data_sent......................: 2.5 GB   4.3 MB/s
     http_req_blocked...............: avg=579ns    min=334ns   med=520ns    max=64.83ms p(90)=762ns    p(95)=872ns
     http_req_connecting............: avg=0ns      min=0s      med=0s       max=1.05ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=385.19µs min=29.69µs med=280.94µs max=65.18ms p(90)=637.09µs p(95)=703.44µs
       { expected_response:true }...: avg=385.19µs min=29.69µs med=280.94µs max=65.18ms p(90)=637.09µs p(95)=703.44µs
     http_req_failed................: 0.00%    ✓ 0            ✗ 31354121
     http_req_receiving.............: avg=7.55µs   min=3.97µs  med=6.81µs   max=64.97ms p(90)=9.5µs    p(95)=10.43µs
     http_req_sending...............: avg=2.58µs   min=1.79µs  med=2.33µs   max=23.86ms p(90)=3.29µs   p(95)=3.53µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=375.05µs min=21.77µs med=270.9µs  max=33.68ms p(90)=627.06µs p(95)=693.52µs
     http_reqs......................: 31354121 53965.631147/s
     iteration_duration.............: avg=399.27µs min=40.55µs med=294.89µs max=67.15ms p(90)=650.84µs p(95)=717.04µs
     iterations.....................: 31354121 53965.631147/s
     vus............................: 49       min=0          max=49
     vus_max........................: 50       min=50         max=50


running (09m41.0s), 00/50 VUs, 31354121 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.1s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s
ramping  ✓ [======================================] 00/50 VUs  3m41s   
```

### `name.js`

On MACHINE A:
```
     execution: local
        script: name.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 1.8 GB   3.2 MB/s
     data_sent......................: 1.1 GB   1.8 MB/s
     http_req_blocked...............: avg=1.8µs    min=530ns   med=1.02µs   max=22.22ms  p(90)=1.82µs  p(95)=2.25µs 
     http_req_connecting............: avg=4ns      min=0s      med=0s       max=10.47ms  p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=993.12µs min=56.15µs med=745.41µs max=254.22ms p(90)=1.76ms  p(95)=2.36ms 
       { expected_response:true }...: avg=993.12µs min=56.15µs med=745.41µs max=254.22ms p(90)=1.76ms  p(95)=2.36ms 
     http_req_failed................: 0.00%    ✓ 0            ✗ 11845801
     http_req_receiving.............: avg=29.42µs  min=6.94µs  med=15.52µs  max=250.63ms p(90)=25.44µs p(95)=30.46µs
     http_req_sending...............: avg=9.78µs   min=2.56µs  med=5.48µs   max=55.33ms  p(90)=8.97µs  p(95)=10.5µs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=953.9µs  min=41.64µs med=719.86µs max=82.12ms  p(90)=1.72ms  p(95)=2.29ms 
     http_reqs......................: 11845801 20388.276335/s
     iteration_duration.............: avg=1.05ms   min=86.15µs med=792.12µs max=270.3ms  p(90)=1.83ms  p(95)=2.46ms 
     iterations.....................: 11845801 20388.276335/s
     vus............................: 49       min=0          max=49    
     vus_max........................: 50       min=50         max=50    


running (09m41.0s), 00/50 VUs, 11845801 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.1s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s  
```

On MACHINE B:
```
     execution: local
        script: name.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 4.7 GB   8.1 MB/s
     data_sent......................: 2.7 GB   4.6 MB/s
     http_req_blocked...............: avg=643ns    min=361ns   med=569ns    max=3.96ms   p(90)=858ns    p(95)=957ns
     http_req_connecting............: avg=0ns      min=0s      med=0s       max=396.81µs p(90)=0s       p(95)=0s
     http_req_duration..............: avg=394.36µs min=31.75µs med=294.3µs  max=59.67ms  p(90)=656.41µs p(95)=730.33µs
       { expected_response:true }...: avg=394.36µs min=31.75µs med=294.3µs  max=59.67ms  p(90)=656.41µs p(95)=730.33µs
     http_req_failed................: 0.00%    ✓ 0            ✗ 30107395
     http_req_receiving.............: avg=8.03µs   min=4.05µs  med=7.21µs   max=59.18ms  p(90)=10.33µs  p(95)=11.22µs
     http_req_sending...............: avg=2.86µs   min=1.91µs  med=2.54µs   max=12.36ms  p(90)=3.65µs   p(95)=3.89µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=383.45µs min=23.55µs med=283.18µs max=43.48ms  p(90)=645.57µs p(95)=719.2µs
     http_reqs......................: 30107395 51819.812009/s
     iteration_duration.............: avg=415.69µs min=48.6µs  med=315.77µs max=59.74ms  p(90)=677.39µs p(95)=751.63µs
     iterations.....................: 30107395 51819.812009/s
     vus............................: 49       min=0          max=49
     vus_max........................: 50       min=50         max=50


running (09m41.0s), 00/50 VUs, 30107395 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.0s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s
ramping  ✓ [======================================] 00/50 VUs  3m41s
```

### `post-body.js`

On MACHINE A:
```
     execution: local
        script: post-body.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 5.2 GB  9.0 MB/s
     data_sent......................: 5.2 GB  8.9 MB/s
     http_req_blocked...............: avg=1.79µs  min=481ns    med=1.13µs  max=25.74ms p(90)=1.98µs  p(95)=2.31µs
     http_req_connecting............: avg=4ns     min=0s       med=0s      max=2.59ms  p(90)=0s      p(95)=0s    
     http_req_duration..............: avg=1.46ms  min=91.71µs  med=1.19ms  max=42.12ms p(90)=2.55ms  p(95)=3.26ms
       { expected_response:true }...: avg=1.46ms  min=91.71µs  med=1.19ms  max=42.12ms p(90)=2.55ms  p(95)=3.26ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 8125106
     http_req_receiving.............: avg=26.08µs min=7.22µs   med=17.14µs max=36.56ms p(90)=29.43µs p(95)=36.3µs
     http_req_sending...............: avg=11.64µs min=3.33µs   med=7.52µs  max=35.07ms p(90)=12.25µs p(95)=14.5µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s      p(90)=0s      p(95)=0s    
     http_req_waiting...............: avg=1.42ms  min=72.82µs  med=1.16ms  max=42.08ms p(90)=2.51ms  p(95)=3.2ms 
     http_reqs......................: 8125106 13984.59745/s
     iteration_duration.............: avg=1.54ms  min=139.37µs med=1.26ms  max=46.69ms p(90)=2.65ms  p(95)=3.37ms
     iterations.....................: 8125106 13984.59745/s
     vus............................: 49      min=0         max=49   
     vus_max........................: 50      min=50        max=50   


running (09m41.0s), 00/50 VUs, 8125106 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.2s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s  
```

On MACHINE B:
```
     execution: local
        script: post-body.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 12 GB    21 MB/s
     data_sent......................: 12 GB    21 MB/s
     http_req_blocked...............: avg=668ns    min=379ns   med=616ns    max=8.13ms   p(90)=798ns  p(95)=967ns
     http_req_connecting............: avg=0ns      min=0s      med=0s       max=497.25µs p(90)=0s     p(95)=0s
     http_req_duration..............: avg=639.95µs min=46.71µs med=467.34µs max=31.29ms  p(90)=1.06ms p(95)=1.17ms
       { expected_response:true }...: avg=639.95µs min=46.71µs med=467.34µs max=31.29ms  p(90)=1.06ms p(95)=1.17ms
     http_req_failed................: 0.00%    ✓ 0           ✗ 18734678
     http_req_receiving.............: avg=7.88µs   min=4.11µs  med=7.18µs   max=30.38ms  p(90)=9.63µs p(95)=10.95µs
     http_req_sending...............: avg=3.67µs   min=2.62µs  med=3.39µs   max=11.41ms  p(90)=4.19µs p(95)=4.89µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s     p(95)=0s
     http_req_waiting...............: avg=628.39µs min=38.63µs med=455.78µs max=31.05ms  p(90)=1.05ms p(95)=1.16ms
     http_reqs......................: 18734678 32245.46861/s
     iteration_duration.............: avg=670.15µs min=72.59µs med=497.28µs max=31.33ms  p(90)=1.09ms p(95)=1.2ms
     iterations.....................: 18734678 32245.46861/s
     vus............................: 49       min=0         max=49
     vus_max........................: 50       min=50        max=50


running (09m41.0s), 00/50 VUs, 18734678 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.1s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s
ramping  ✓ [======================================] 00/50 VUs  3m41s
```

## Hono

### `hello-world.js`

On MACHINE A:
```
     execution: local
        script: hello-world.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 1.1 GB  1.9 MB/s
     data_sent......................: 467 MB  804 kB/s
     http_req_blocked...............: avg=1.42µs  min=581ns   med=1.02µs max=12.54ms  p(90)=1.81µs  p(95)=2.14µs 
     http_req_connecting............: avg=2ns     min=0s      med=0s     max=799.74µs p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=2.11ms  min=72.36µs med=1.62ms max=59.58ms  p(90)=3.58ms  p(95)=4.55ms 
       { expected_response:true }...: avg=2.11ms  min=72.36µs med=1.62ms max=59.58ms  p(90)=3.58ms  p(95)=4.55ms 
     http_req_failed................: 0.00%   ✓ 0            ✗ 5840253
     http_req_receiving.............: avg=20.86µs min=6.96µs  med=16.5µs max=17.17ms  p(90)=32.04µs p(95)=39.42µs
     http_req_sending...............: avg=7.03µs  min=2.71µs  med=5.17µs max=23.66ms  p(90)=8.73µs  p(95)=10.77µs
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s     max=0s       p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=2.08ms  min=59.8µs  med=1.6ms  max=59.54ms  p(90)=3.55ms  p(95)=4.52ms 
     http_reqs......................: 5840253 10051.987226/s
     iteration_duration.............: avg=2.15ms  min=90.26µs med=1.66ms max=59.78ms  p(90)=3.62ms  p(95)=4.6ms  
     iterations.....................: 5840253 10051.987226/s
     vus............................: 49      min=0          max=49   
     vus_max........................: 50      min=50         max=50   


running (09m41.0s), 00/50 VUs, 5840253 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.3s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s    
```

On MACHINE B:
```
     execution: local
        script: hello-world.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 2.8 GB   4.8 MB/s
     data_sent......................: 1.2 GB   2.0 MB/s
     http_req_blocked...............: avg=556ns    min=344ns   med=512ns    max=2.06ms  p(90)=604ns  p(95)=768ns
     http_req_connecting............: avg=0ns      min=0s      med=0s       max=346.2µs p(90)=0s     p(95)=0s
     http_req_duration..............: avg=850.86µs min=39.48µs med=647.08µs max=30.95ms p(90)=1.45ms p(95)=1.6ms
       { expected_response:true }...: avg=850.86µs min=39.48µs med=647.08µs max=30.95ms p(90)=1.45ms p(95)=1.6ms
     http_req_failed................: 0.00%    ✓ 0            ✗ 14541073
     http_req_receiving.............: avg=7.56µs   min=4.15µs  med=7.04µs   max=29.53ms p(90)=8.85µs p(95)=10.06µs
     http_req_sending...............: avg=2.43µs   min=1.76µs  med=2.28µs   max=2.28ms  p(90)=2.69µs p(95)=3.07µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s     p(95)=0s
     http_req_waiting...............: avg=840.86µs min=31.48µs med=637.27µs max=24.59ms p(90)=1.44ms p(95)=1.59ms
     http_reqs......................: 14541073 25027.545784/s
     iteration_duration.............: avg=864.56µs min=51.47µs med=660.78µs max=30.97ms p(90)=1.46ms p(95)=1.61ms
     iterations.....................: 14541073 25027.545784/s
     vus............................: 49       min=0          max=49
     vus_max........................: 50       min=50         max=50


running (09m41.0s), 00/50 VUs, 14541073 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.1s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s
ramping  ✓ [======================================] 00/50 VUs  3m41s
```

### `name.js`

On MACHINE A:
```
     execution: local
        script: name.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 1.0 GB  1.7 MB/s
     data_sent......................: 486 MB  837 kB/s
     http_req_blocked...............: avg=1.65µs  min=582ns    med=1.19µs max=11.35ms p(90)=2.01µs  p(95)=2.43µs 
     http_req_connecting............: avg=3ns     min=0s       med=0s     max=2.72ms  p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=2.24ms  min=80.21µs  med=1.71ms max=53.46ms p(90)=3.77ms  p(95)=4.85ms 
       { expected_response:true }...: avg=2.24ms  min=80.21µs  med=1.71ms max=53.46ms p(90)=3.77ms  p(95)=4.85ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 5465046
     http_req_receiving.............: avg=22.77µs min=7.44µs   med=18.4µs max=50.06ms p(90)=32.95µs p(95)=40.44µs
     http_req_sending...............: avg=8.14µs  min=2.79µs   med=6.03µs max=21.97ms p(90)=9.93µs  p(95)=12.53µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s     max=0s      p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=2.21ms  min=64.4µs   med=1.68ms max=37.7ms  p(90)=3.74ms  p(95)=4.8ms  
     http_reqs......................: 5465046 9406.199941/s
     iteration_duration.............: avg=2.29ms  min=108.43µs med=1.76ms max=54.1ms  p(90)=3.83ms  p(95)=4.92ms 
     iterations.....................: 5465046 9406.199941/s
     vus............................: 49      min=0         max=49   
     vus_max........................: 50      min=50        max=50   


running (09m41.0s), 00/50 VUs, 5465046 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.1s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s  
```

On MACHINE B:
```
     execution: local
        script: name.js
        output: -

     scenarios: (100.00%) 3 scenarios, 50 max VUs, 10m1s max duration (incl. graceful stop):
              * default: 1000 iterations shared among 10 VUs (maxDuration: 30s, gracefulStop: 5s)
              * constant: 20 looping VUs for 5m0s (startTime: 40s, gracefulStop: 10s)
              * ramping: Up to 50 looping VUs for 3m41s over 6 stages (gracefulRampDown: 30s, startTime: 6m0s, gracefulStop: 20s)


     data_received..................: 2.5 GB   4.3 MB/s
     data_sent......................: 1.2 GB   2.1 MB/s
     http_req_blocked...............: avg=595ns    min=363ns   med=539ns    max=8.8ms    p(90)=675ns  p(95)=899ns
     http_req_connecting............: avg=0ns      min=0s      med=0s       max=475.46µs p(90)=0s     p(95)=0s
     http_req_duration..............: avg=902.96µs min=41.49µs med=684.98µs max=22.07ms  p(90)=1.53ms p(95)=1.69ms
       { expected_response:true }...: avg=902.96µs min=41.49µs med=684.98µs max=22.07ms  p(90)=1.53ms p(95)=1.69ms
     http_req_failed................: 0.00%    ✓ 0            ✗ 13626918
     http_req_receiving.............: avg=7.42µs   min=4.16µs  med=6.78µs   max=20.65ms  p(90)=8.93µs p(95)=10.33µs
     http_req_sending...............: avg=2.63µs   min=1.95µs  med=2.42µs   max=4.77ms   p(90)=3.07µs p(95)=3.55µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s     p(95)=0s
     http_req_waiting...............: avg=892.89µs min=32.96µs med=675.19µs max=19.54ms  p(90)=1.52ms p(95)=1.68ms
     http_reqs......................: 13626918 23454.133421/s
     iteration_duration.............: avg=922.62µs min=59.42µs med=704.48µs max=22.11ms  p(90)=1.55ms p(95)=1.71ms
     iterations.....................: 13626918 23454.133421/s
     vus............................: 49       min=0          max=49
     vus_max........................: 50       min=50         max=50


running (09m41.0s), 00/50 VUs, 13626918 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.1s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s
ramping  ✓ [======================================] 00/50 VUs  3m41s
```

### `post-body.js`

On MACHINE A:
```
     data_received..................: 702 MB  1.2 MB/s
     data_sent......................: 663 MB  1.1 MB/s
     http_req_blocked...............: avg=1.79µs  min=0s       med=1.27µs  max=12.3ms  p(90)=2.16µs  p(95)=2.58µs 
     http_req_connecting............: avg=66ns    min=0s       med=0s      max=12.28ms p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=11.93ms min=0s       med=6.11ms  max=5.01s   p(90)=15.09ms p(95)=19.44ms
       { expected_response:true }...: avg=11.58ms min=260.25µs med=6.12ms  max=4.44s   p(90)=15.11ms p(95)=19.45ms
     http_req_failed................: 0.39%   ✓ 4132        ✗ 1044080
     http_req_receiving.............: avg=29.27µs min=0s       med=23.64µs max=16.48ms p(90)=42.35µs p(95)=51.02µs
     http_req_sending...............: avg=13.05µs min=0s       med=8.53µs  max=21.88ms p(90)=18.63µs p(95)=25.31µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s      p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=11.89ms min=0s       med=6.07ms  max=5.01s   p(90)=15.04ms p(95)=19.38ms
     http_reqs......................: 1048212 1804.109644/s
     iteration_duration.............: avg=12.02ms min=130.12µs med=6.2ms   max=5.01s   p(90)=15.18ms p(95)=19.53ms
     iterations.....................: 1048212 1804.109644/s
     vus............................: 49      min=0         max=49   
     vus_max........................: 50      min=50        max=50   


running (09m41.0s), 00/50 VUs, 1048212 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.6s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s      
ramping  ✓ [======================================] 00/50 VUs  3m41s
```

On MACHINE B:
```
     data_received..................: 1.4 GB  2.4 MB/s
     data_sent......................: 1.3 GB  2.3 MB/s
     http_req_blocked...............: avg=710ns  min=0s       med=634ns  max=5.6ms  p(90)=754ns   p(95)=994ns
     http_req_connecting............: avg=8ns    min=0s       med=0s     max=1.04ms p(90)=0s      p(95)=0s
     http_req_duration..............: avg=6.03ms min=0s       med=2.42ms max=15.65s p(90)=5.66ms  p(95)=8.35ms
       { expected_response:true }...: avg=5.43ms min=192.47µs med=2.42ms max=3.99s  p(90)=5.67ms  p(95)=8.36ms
     http_req_failed................: 0.40%   ✓ 8448        ✗ 2102524
     http_req_receiving.............: avg=9.87µs min=0s       med=8.82µs max=5.86ms p(90)=11.54µs p(95)=15.17µs
     http_req_sending...............: avg=3.79µs min=0s       med=3.48µs max=1.97ms p(90)=4.2µs   p(95)=5.29µs
     http_req_tls_handshaking.......: avg=0s     min=0s       med=0s     max=0s     p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=6.01ms min=0s       med=2.41ms max=15.65s p(90)=5.64ms  p(95)=8.34ms
     http_reqs......................: 2110972 3615.198167/s
     iteration_duration.............: avg=6.06ms min=76.07µs  med=2.45ms max=15.65s p(90)=5.7ms   p(95)=8.39ms
     iterations.....................: 2110972 3615.198167/s
     vus............................: 49      min=0         max=49
     vus_max........................: 50      min=50        max=50


running (09m43.9s), 00/50 VUs, 2110972 complete and 0 interrupted iterations
default  ✓ [======================================] 10 VUs     00.3s/30s  1000/1000 shared iters
constant ✓ [======================================] 20 VUs     5m0s
ramping  ✓ [======================================] 00/50 VUs  3m41s
```
