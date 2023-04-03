namespace Equiprent.Logic.Infrastructure
{
    public class CurrentDirectoryHelper
    {
        public const string AspNetCoreModuleDll = "aspnetcorev2_inprocess.dll";

        [System.Runtime.InteropServices.DllImport("kernel32.dll")]
        private static extern IntPtr GetModuleHandle(string lpModuleName);

        [System.Runtime.InteropServices.DllImport(AspNetCoreModuleDll)]
        private static extern int GetApplicationProperties(ref IISConfigurationData iiConfigData);

        [System.Runtime.InteropServices.StructLayout(System.Runtime.InteropServices.LayoutKind.Sequential)]
        private struct IISConfigurationData
        {
            public IntPtr pNativeApplication;
            [System.Runtime.InteropServices.MarshalAs(System.Runtime.InteropServices.UnmanagedType.BStr)]
            public string pwzFullApplicationPath;
            [System.Runtime.InteropServices.MarshalAs(System.Runtime.InteropServices.UnmanagedType.BStr)]
            public string pwzVirtualApplicationPath;
            public bool fWindowsAuthEnabled;
            public bool fBasicAuthEnabled;
            public bool fAnonymousAuthEnable;
        }

        public static void SetCurrentDirectory()
        {
            try
            {
                var sitePhysicalPath = Environment.GetEnvironmentVariable("ASPNETCORE_IIS_PHYSICAL_PATH");

                if (string.IsNullOrEmpty(sitePhysicalPath))
                {
                    if (GetModuleHandle(AspNetCoreModuleDll) == IntPtr.Zero)
                    {
                        return;
                    }

                    var configurationData = default(IISConfigurationData);

                    if (GetApplicationProperties(ref configurationData) != 0)
                    {
                        return;
                    }

                    sitePhysicalPath = configurationData.pwzFullApplicationPath;
                }

                Environment.CurrentDirectory = sitePhysicalPath;
            }
            catch
            {
            }
        }
    }
}
