﻿using XLua;

namespace Managers
{
    /// <summary>
    /// Handles both Lua and JavaScript engines.
    /// </summary>
    public class ScriptManager : MonoSingleton<ScriptManager>
    {
        public const string LuaRoot = "Lua/";

        public const string SpecialAbilityFunc = "On_SpecialAbility";
        public const string BehaviorUpdateFunc = "On_MonoUpdate";

        /// <summary>
        /// Reference to the Lua script engine.
        /// </summary>
        public static LuaEnv Environment => Instance._luaEnv;

        private readonly LuaEnv _luaEnv = new();

        protected override void OnAwake()
        {
            // Add this to the ScriptEngine.
            var scriptEngine = GameManager.ScriptEngine;
            if (!scriptEngine) return;

            scriptEngine.AddRuntimeObject("game", this);

            // Run the JavaScript entrypoint.
            scriptEngine.RunScript("out/index.js");
        }

        protected override void OnDestroy()
        {
            base.OnDestroy();
            _luaEnv.Dispose();
        }

        #region JavaScript References

        public WaveManager WaveManager => WaveManager.Instance;
        public GameManager GameManager => GameManager.Instance;

        #endregion
    }
}
