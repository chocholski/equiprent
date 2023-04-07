using System;
using System.ServiceProcess;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

namespace LocalService.ServiceBaseClasses
{
    public class ServiceBaseLifetime : ServiceBase, IHostLifetime
    {
        private readonly TaskCompletionSource<object> _delayStart = new TaskCompletionSource<object>();

        public ServiceBaseLifetime(IHostApplicationLifetime applicationLifetime)
        {
            ApplicationLifetime = applicationLifetime ?? throw new ArgumentNullException(nameof(applicationLifetime));
        }

        private IHostApplicationLifetime ApplicationLifetime { get; }

        public Task WaitForStartAsync(CancellationToken cancellationToken)
        {
            cancellationToken.Register(() => _delayStart.TrySetCanceled());
#pragma warning disable CA1416 // Validate platform compatibility
            ApplicationLifetime.ApplicationStopping.Register(Stop);
#pragma warning restore CA1416 // Validate platform compatibility

            new Thread(Run).Start(); // Otherwise this would block and prevent IHost.StartAsync from finishing.
            return _delayStart.Task;
        }

        private void Run()
        {
            try
            {
#pragma warning disable CA1416 // Validate platform compatibility
                Run(this); // This blocks until the service is stopped.
#pragma warning restore CA1416 // Validate platform compatibility
                _delayStart.TrySetException(new InvalidOperationException("Stopped without starting"));
            }
            catch (Exception ex)
            {
                _delayStart.TrySetException(ex);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
#pragma warning disable CA1416 // Validate platform compatibility
            Stop();
#pragma warning restore CA1416 // Validate platform compatibility
            return Task.CompletedTask;
        }

        // Called by base.Run when the service is ready to start.
        protected override void OnStart(string[] args)
        {
            _delayStart.TrySetResult(null!);
#pragma warning disable CA1416 // Validate platform compatibility
            base.OnStart(args);
#pragma warning restore CA1416 // Validate platform compatibility
        }

        // Called by base.Stop. This may be called multiple times by service Stop, ApplicationStopping, and StopAsync.
        // That's OK because StopApplication uses a CancellationTokenSource and prevents any recursion.
        protected override void OnStop()
        {
            ApplicationLifetime.StopApplication();
#pragma warning disable CA1416 // Validate platform compatibility
            base.OnStop();
#pragma warning restore CA1416 // Validate platform compatibility
        }
    }
}
